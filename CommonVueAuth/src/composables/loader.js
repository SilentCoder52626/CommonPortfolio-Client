import { h  } from 'vue';
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

const BlockWindow = (container,slots) => {
    if (activeLoader) {
        activeLoader.hide();
    }
    if (!container) {
        activeLoader = $loader.show(slots);
    }
    else{
        activeLoader = $loader.show({
            isFullPage: false,
            container,
        },
        slots);
    }
};

const UnBlockWindow = () => {
  if (activeLoader) {
    activeLoader.hide();
    activeLoader = null;
  }
};

export default {
    BlockWindow,
  UnBlockWindow,
};
