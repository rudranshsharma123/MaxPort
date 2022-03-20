// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "hardhat/console.sol";

// import {StringUtils} from "./libraries/StringUtils.sol";
// import {Base64} from "./libraries/Base64.sol"
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DomainService is ERC721URIStorage {
    address payable public owner;
    error Unauthorized();
    error AlreadyRegistered();
    error InvalidName(string name);

    constructor(string memory _tld) payable ERC721("DomainService", "ENS") {
        owner = payable(msg.sender);

        console.log("THIS IS MY DOMAINS CONTRACT. NICE.");
        tld = _tld;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string svgPartOne =
        '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#B)" d="M0 0h270v270H0z"/><defs><filter id="A" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><path d="M72.863 42.949c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-10.081 6.032-6.85 3.934-10.081 6.032c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-8.013-4.721a4.52 4.52 0 0 1-1.589-1.616c-.384-.665-.594-1.418-.608-2.187v-9.31c-.013-.775.185-1.538.572-2.208a4.25 4.25 0 0 1 1.625-1.595l7.884-4.59c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v6.032l6.85-4.065v-6.032c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595L41.456 24.59c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-14.864 8.655a4.25 4.25 0 0 0-1.625 1.595c-.387.67-.585 1.434-.572 2.208v17.441c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l10.081-5.901 6.85-4.065 10.081-5.901c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v9.311c.013.775-.185 1.538-.572 2.208a4.25 4.25 0 0 1-1.625 1.595l-7.884 4.721c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-7.884-4.59a4.52 4.52 0 0 1-1.589-1.616c-.385-.665-.594-1.418-.608-2.187v-6.032l-6.85 4.065v6.032c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l14.864-8.655c.657-.394 1.204-.95 1.589-1.616s.594-1.418.609-2.187V55.538c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595l-14.993-8.786z" fill="#fff"/><defs><linearGradient id="B" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#cb5eee"/><stop offset="1" stop-color="#0cd7e4" stop-opacity=".99"/></linearGradient></defs><text x="32.5" y="231" font-size="27" fill="#fff" filter="url(#A)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
    string svgPartTwo = "</text></svg>";
    string public tld;
    mapping(string => address) public domains;
    mapping(string => string) public bio;
    mapping(string => string) public linkedInLink;
    mapping(string => string) public twitterLink;
    mapping(string => string) public githubLink;
    mapping(string => string) public websiteLink;
    mapping(string => string) public emailLink;
    mapping(string => string) public leetcodeLink;
    mapping(uint256 => string) public names;

    function register(string calldata _name) public payable {
        if(domains[_name] != address(0)) revert AlreadyRegistered();
        // if(!isValid(_name)) revert InvalidName(_name);
        
        uint256 price = getPrice(_name);
        console.log("%d, %d", price, msg.value);
        require(msg.value >= price, "You need to pay more");
        string memory name = string(abi.encodePacked(_name, ".", tld));
        string memory finalSvg = string(
            abi.encodePacked(svgPartOne, name, svgPartTwo)
        );
        uint256 newRecordId = _tokenIds.current();
        uint256 length = getLength(_name);
        string memory strLen = Strings.toString(length);
        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            name,
            tld,
            newRecordId
        );
        string memory json = encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        _name,
                        '", "description": "A domain on the Ninja name service", "image": "data:image/svg+xml;base64,',
                        encode(bytes(finalSvg)),
                        '","length":"',
                        strLen,
                        '"}'
                    )
                )
            )
        );
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        console.log(
            "\n--------------------------------------------------------"
        );
        console.log("Final tokenURI", finalTokenUri);
        console.log(
            "--------------------------------------------------------\n"
        );
        _safeMint(msg.sender, newRecordId);
        _setTokenURI(newRecordId, finalTokenUri);
        domains[_name] = msg.sender;
        console.log("%s registered", _name);
        names[newRecordId] = name;
        _tokenIds.increment();
    }

    bytes internal constant TABLE =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF)
                )
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF)
                )
                out := shl(8, out)
                out := add(
                    out,
                    and(mload(add(tablePtr, and(input, 0x3F))), 0xFF)
                )
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }

    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    function isValid(string memory _name) public pure returns (bool) {
        uint256 length = getLength(_name);
        return length > 0 && length <= 10;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed to withdraw Matic");
    }

    function setRecords(
        string memory _name,
        string memory _bio,
        string memory _linkedIn,
        string memory _twitter,
        string memory _github,
        string memory _website,
        string memory _email,
        string memory _leetcode
    ) public {
        if(domains[_name] != msg.sender) revert Unauthorized();
        bio[_name] = _bio;
        linkedInLink[_name] = _linkedIn;
        twitterLink[_name] = _twitter;
        githubLink[_name] = _github;
        websiteLink[_name] = _website;
        emailLink[_name] = _email;
        leetcodeLink[_name] = _leetcode;
        console.log("%s records set", _name);
    }

    function getAddress(string calldata _name) public view returns (address) {
        return domains[_name];
    }

    function getPrice(string calldata _name) public pure returns (uint256) {
        bytes memory _nameBytes = bytes(_name);
        uint256 len = _nameBytes.length;
        require(len > 0);
        if (len == 3) {
            return 0.0001 * 10**17; // 5 MATIC = 5 000 000 000 000 000 000 (18 decimals). We're going with 0.5 Matic cause the faucets don't give a lot
        } else if (len == 4) {
            return 0.0001 * 10**17; // To charge smaller amounts, reduce the decimals. This is 0.3
        } else {
            return 0.0001 * 10**17;
        }

        // console.log("%s records set", _name);
    }

    function getLength(string memory _name) public pure returns (uint256) {
        bytes memory _nameBytes = bytes(_name);
        uint256 len = _nameBytes.length;
        require(len > 0);
        return len;
    }

    function getRecords(string calldata _name)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            bio[_name],
            linkedInLink[_name],
            twitterLink[_name],
            githubLink[_name],
            websiteLink[_name],
            emailLink[_name],
            leetcodeLink[_name]
        );
    }

    function getAllNames() public view returns (string[] memory) {
        console.log("Getting all names from contract");
        string[] memory allNames = new string[](_tokenIds.current());
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            allNames[i] = names[i];
            console.log("Name for token %d is %s", i, allNames[i]);
        }

        return allNames;
    }
}
