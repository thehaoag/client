// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  /* {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  }, */
  {
    title: 'Result of Attandance',
    path: '/dashboard/result',
    icon: icon('ic_user')
  },
  {
    title: 'Attendance',
    path: '/dashboard/attendance',
    icon: icon('ic_attend')
  },
  {
    title: 'Import Data',
    path: '/dashboard/import',
    icon: icon('ic_import')
  }
];

export default navConfig;
