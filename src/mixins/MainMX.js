import { Buffer } from 'buffer';
window.Buffer = Buffer;

const main_mx = {
  methods: {
    getProvider(){
      if ('phantom' in window) {
        const provider = window.phantom?.solana;
    
        if (provider?.isPhantom) {
          return provider;
        }
      }
    
      window.open('https://phantom.app/', '_blank');
    }
  },
}

export default main_mx;