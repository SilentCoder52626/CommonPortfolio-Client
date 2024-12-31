import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export function useLoader () {
    let loader = useLoading();

    const BlockWindow = () => {
        loader.show({
            color : "#4F46E5",
        });
    };
    const UnBlockWindow = () => {
        loader.hide();
    };
    const BlockContent = (htmlContainer) => {
        if (!htmlContainer || !(htmlContainer instanceof HTMLElement)) {
            console.error('Invalid container provided to BlockContent. Must be a DOM element.');
            return;
          }
        loader.show({
            container : htmlContainer,
            color : "#4F46E5",
            isFullPage : false
        })
    };
    const UnBlockContent = () => {
        loader.hide();
    };

    return {
        blockWindow: BlockWindow,
        unBlockWindow: UnBlockWindow,
        blockContent: BlockContent,
        unBlockContent: UnBlockContent,
    };
} 
