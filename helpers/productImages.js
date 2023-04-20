const productImages = (pictures) => {
    const { coverImage, images } = pictures;

    const productImages = [];
    images?.map((image) => {
        productImages.push(image.path);
    })

    return {
        coverImage: coverImage ? coverImage[0]?.path : undefined,
        images: productImages.length ? productImages : undefined
    };
};

module.exports = {
    productImages
};