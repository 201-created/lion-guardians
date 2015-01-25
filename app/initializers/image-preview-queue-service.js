export function initialize(container, application) {
  application.inject('route', 'imagePreviewQueue', 'service:image-preview-queue');
  application.inject('controller', 'imagePreviewQueue', 'service:image-preview-queue');
}

export default {
  name: 'image-preview-queue-service',
  initialize: initialize
};
