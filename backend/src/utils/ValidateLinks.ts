//---------- this is for validating the links like yt,x,docs before adding  --------

//--------this is inbuild url validator by JS---------
function isValidUrl(url:string) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function isValidYouTubeLink(link:string) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;
  return youtubeRegex.test(link);
}

function isValidTwitterLink(link:string) {
  const twitterRegex = /^(https?:\/\/)?(www\.)?x\.com\/\w+\/status\/\d+/;
  return twitterRegex.test(link);
}

function isValidGithubLink(link:string) {
  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+(\/[\w-]+)?\/?$/;
  return githubRegex.test(link);
}

function isValidDocsLink(link:string) {
  const docsRegex = /^(https?:\/\/)?(docs\.google\.com\/document\/d\/[\w-]+\/?.*)/;
  return docsRegex.test(link);
}

function isValidGenericLink(link:string) {
  return isValidUrl(link);
}









//  #1: sabse pahle yaha ayega link to check url with its respected type regex like type='youtube' will check regex for url validation for youtube only

export function validateLinkByType(type:string, link:string) {

//---$$ before all of that we have to check is user entered url or something else like anything-bgdewgfkehifheww this types.  --> using inbuilt JS url checker.
  if (!isValidUrl(link)) {
    return { valid: false, error: "Invalid URL format." };
  }





  switch (type) {
    case "Youtube":
      if (!isValidYouTubeLink(link)) {
        return { valid: false, error: "Invalid YouTube link." };
      }
      break;
    case "Twitter":
      if (!isValidTwitterLink(link)) {
        return { valid: false, error: "Invalid Twitter link." };
      }
      break;
    case "Github":
      if (!isValidGithubLink(link)) {
        return { valid: false, error: "Invalid GitHub link." };
      }
      break;
    case "Docs":
      if (!isValidDocsLink(link)) {
        return { valid: false, error: "Invalid Docs link." };
      }
      break;
    case "Link":
    case "Others":
      if (!isValidGenericLink(link)) {
        return { valid: false, error: "Invalid link URL." };
      }
      break;
      //btw yaha tab to ayega nahi becz in our modal we have to choose only out of 6
    default:
      return { valid: false, error: "Unknown content type." };
  }

  return { valid: true };
}



// module.exports = {
//   isValidUrl,
//   isValidYouTubeLink,
//   isValidTwitterLink,
//   isValidGithubLink,
//   isValidDocsLink,
//   isValidGenericLink,
//   validateLinkByType,
// };
