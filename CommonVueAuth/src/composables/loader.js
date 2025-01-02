import { useLoading } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const $loader = useLoading(
  {
    color: '#4F46E5',
    height: 40,
    width: 40,
  }, 
);

let activeLoader = null;
let htmlContainer = null;

const BlockWindow = (container,slots) => {
    if (activeLoader) {
        activeLoader.hide();
    }
    if (!container) {
        activeLoader = $loader.show(slots);
    }
    else{
      if (container.classList) {
          container.classList.add('relative');
        }
        htmlContainer = container;
        activeLoader = $loader.show({
            isFullPage: false,
            container,
        },
        slots);
    }
};

const UnBlockWindow = () => {
  if (activeLoader) {
    if (htmlContainer && htmlContainer.classList) {
      htmlContainer.classList.remove('relative');
    }
    activeLoader.hide();
    activeLoader = null;
    htmlContainer = null;
  }
};

export default {
    BlockWindow,
    UnBlockWindow,
};
