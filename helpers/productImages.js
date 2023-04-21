const productImages = (body, files) => {
    const { coverImage, images } = files;

    const productImages = [];
    images?.map((image) => {
        productImages.push(image.path);
    })

    // return {
    //     coverImage: coverImage ? coverImage[0]?.path : undefined,
    //     images: productImages.length ? productImages : undefined
    // };

    if (coverImage) body.coverImage = coverImage[0]?.path;
    if (productImages.length) body.images = productImages;
    
    return body;
};

module.exports = {
    productImages
};