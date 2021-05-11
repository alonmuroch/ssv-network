// File: contracts/SSVNetwork.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './OperatorRegistry.sol';
import './IValidatorRegistry.sol';

contract SSVNetwork is OperatorRegistry, IValidatorRegistry {
  uint256 public validatorCount;

  struct Validator {
    address ownerAddress;
    bytes publicKey;
    Oess[] oess;
  }

  mapping(bytes => Validator) internal validators;

  /**
   * @dev See {IValidatorRegistry-addValidator}.
   */
  function addValidator(
    address _ownerAddress,
    bytes calldata _publicKey,
    bytes[] calldata _operatorPublicKeys,
    bytes[] calldata _sharesPublicKeys,
    bytes[] calldata _encryptedKeys
  ) virtual override public {
    require(_publicKey.length == 48, 'Invalid public key length');
    require(_operatorPublicKeys.length == _sharesPublicKeys.length && _operatorPublicKeys.length == _encryptedKeys.length, 'OESS data structure is not valid');
    require(_ownerAddress != address(0), 'Owner address invalid');
    require(validators[_publicKey].ownerAddress == address(0), 'Validator with same public key already exists');

    Validator storage validatorItem = validators[_publicKey];
    validatorItem.publicKey = _publicKey;
    validatorItem.ownerAddress = _ownerAddress;

    for(uint index = 0; index < _operatorPublicKeys.length; ++index) {
      validatorItem.oess.push(Oess(index, _operatorPublicKeys[index], _sharesPublicKeys[index], _encryptedKeys[index]));
    }

    validatorCount++;
    emit ValidatorAdded(_ownerAddress, _publicKey, validatorItem.oess);
  }
}