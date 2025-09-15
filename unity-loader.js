function loadUnityBuild() {
    const unityContainer = document.getElementById('unity-content');
    
    if (!unityContainer) {
        console.error('Unity container not found');
        return;
    }
    
    const wrapper = document.createElement('div');
    wrapper.style.width = '600px';
    wrapper.style.height = '680px';
    wrapper.style.overflow = 'hidden';
    wrapper.style.position = 'relative';

    const iframe = document.createElement('iframe');
    iframe.src = './unity-maze/index.html';
    iframe.width = '600px';
    iframe.height = '640px';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    wrapper.appendChild(iframe);
    unityContainer.innerHTML = '';
    unityContainer.appendChild(wrapper);
}

// Load Unity when page is ready
document.addEventListener('DOMContentLoaded', loadUnityBuild);