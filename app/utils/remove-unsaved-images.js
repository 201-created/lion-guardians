export default function removeUnsavedImages(imageSet) {
  const unsavedImages = imageSet.get('images').filter((img) => !img.get('id'));
  imageSet.get('images').removeObjects(unsavedImages);
}

