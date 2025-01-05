import { h } from 'vue';
import LoaderSlot from '../components/LoaderSlot.vue'; 

export function afterSlot(message) {
  return {
    after: () => h(LoaderSlot, { message }),
  };
}
