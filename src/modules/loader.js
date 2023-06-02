export const loader = (isVisible) => {
    const loader = document.getElementById('loader');

    isVisible ? loader.style.display = 'flex' : loader.style.display = 'none';
}

export const modalLoader = (isShow) => {
    const modal = document.getElementById('modal')
    const modalLoader = document.getElementById('modalLoader')

    if (isShow) {
        modal.style.display = 'flex';
        modalLoader.style.display = 'flex';
    } else {
        modalLoader.style.display = 'none';
    }
}