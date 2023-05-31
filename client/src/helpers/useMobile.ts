// mobile.js
import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useMobile = () => {
  const isMobile = ref(window.innerWidth < 1280);

  const handleResize = () => {
    isMobile.value = window.innerWidth < 1280;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  return isMobile;
};
