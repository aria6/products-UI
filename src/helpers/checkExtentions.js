//@flow

let extAllowed = ['png', 'jpg', 'jpeg'];

function checkExtention(nameFile: string) {
  let checkFormat = nameFile.split('.');
  let checkFormatLength = checkFormat.length - 1;

  if (extAllowed.includes(checkFormat[checkFormatLength])) {
    return true;
  }

  return false;
}

export default checkExtention;
