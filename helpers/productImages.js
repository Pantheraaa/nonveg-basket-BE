const productImages = (body, files) => {
    // const { cover_image, primary_image, secondary_image } = files;

    const images = [];
    for (const file in files) {
        images.push(files[file]);
    }

    const result = {
        images: []
    };

    images?.map((image) => {
        if (image[0].fieldname === "cover_image")
            result.coverImage = image[0].path;

        else {
            result.images.push(image[0].path);
        }
    })

    return { ...body, ...result };
};

module.exports = {
    productImages
};