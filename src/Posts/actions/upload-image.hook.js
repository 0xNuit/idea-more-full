const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');


/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, uploadImage } = context;

  if (record.isValid() && uploadImage) {
    // uploads/imagename.png
    const filePath = path.join('./uploads', uploadImage.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    // uploads the image locally from the temp files to your server files
    await fs.promises.copyFile(uploadImage.path, filePath);
    // await fs.promises.rename(uploadImage.path, filePath);
    // console.log(filePath);
    // console.log(fs.promises.rename(uploadImage.path, '/', filePath));
    // console.log(uploadImage.path);


    await record.update({ profilePhotoLocation: `/${filePath}` });
    await record.update({ formData: uploadImage.name });
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadImage, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };
