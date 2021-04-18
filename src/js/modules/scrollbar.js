import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

Scrollbar.use(OverscrollPlugin);

Scrollbar.init(document.querySelector('.workplace__outer'), {
  plugins: { overscroll: { effect: 'glow' } },
});
