// Remove original images that don't have IDs.
// The server will come back with new objects
export default function removeUnsavedImages(imageSet) {
  const unsavedImages = imageSet.get('images').filter((img) => !img.get('id'));
  imageSet.get('images').removeObjects(unsavedImages);
  return imageSet;
}

