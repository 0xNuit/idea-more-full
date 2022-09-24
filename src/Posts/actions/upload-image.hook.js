/* eslint-disable no-shadow */
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
    // await fs.promises.copyFile(uploadImage.path, filePath);
    // await fs.promises.rename(uploadImage.path, filePath);
    // EXDEV: cross-device link not permitted, rename
    // Read the file
    fs.readFile(uploadImage.path, (err, data) => {
      if (err) throw err;
      console.log('File read!');

      // Write the file
      fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        // res.write('File uploaded and moved!');
        // res.end();
        // console.log('File written!');
      });

      // Delete the file
      fs.unlink(uploadImage.path, (err) => {
        if (err) throw err;
        console.log('File deleted!');
      });
    });


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
