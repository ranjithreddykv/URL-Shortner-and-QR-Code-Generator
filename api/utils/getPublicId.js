const getCloduinaryPublicId = (url) => {
  if (!url || typeof url !== "string") return null;
  //Handle null,undefined,or non-string input
  /**https://res.cloudinary.com/demo/video/upload/v12345
   * /folder/my_video.mp4*
   * (second line without extension is the public id of particular url)*/
  try {
    //regex to export everything after '/upload/' and before the file extension
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.[a-zA-Z]+)?$/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
      //return public id withod the extension
    }
    return null; //Return null if the pattern is not found
  } catch (error) {
    console.error("Error extracting Cloudinary Public ID:", error);
    return null;
  }
};
export default getCloduinaryPublicId;
