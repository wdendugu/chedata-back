import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    HomeIcon,
    ProductsIcon,
    CategoriesIcon,
    OrdersIcon,
    SettingsIcon,
    LogoutIcon,
    AdminIcon,
} from '@/utils/Icons';

export default function Nav() {
    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = inactiveLink + ' bg-highlight text-black rounded-sm';

    const router = useRouter();
    const { pathname } = router;

    return (
        <aside
            className={
                'text-gray-600 p-4 fixed w-full bg-bgGray h-full sm:static sm:w-auto transition-all'
            }
        >
            <nav className="flex flex-col gap-2">
                <Link
                    href={'/'}
                    className={pathname === '/' ? activeLink : inactiveLink}
                >
                    <HomeIcon />
                    Dashboard
                </Link>
                <Link
                    href={'/courses'}
                    className={
                        pathname.includes('/courses')
                            ? activeLink
                            : inactiveLink
                    }
                >
                    <ProductsIcon />
                    Cursos
                </Link>
                <Link
                    href={'/leads'}
                    className={
                        pathname.includes('/leads') ? activeLink : inactiveLink
                    }
                >
                    <CategoriesIcon />
                    Leads
                </Link>
                <Link
                    href={'/sections'}
                    className={
                        pathname.includes('/sections')
                            ? activeLink
                            : inactiveLink
                    }
                >
                    <OrdersIcon />
                    Comisiones
                </Link>
                <Link
                    href={'/tutors'}
                    className={
                        pathname.includes('/tutors') ? activeLink : inactiveLink
                    }
                >
                    <AdminIcon />
                    Docentes
                </Link>
                <Link
                    href={'/settings'}
                    className={
                        pathname.includes('/settings')
                            ? activeLink
                            : inactiveLink
                    }
                >
                    <SettingsIcon />
                    Settings
                </Link>
                {/* <button className={inactiveLink} onClick={console.log('Ok')}>
                    <LogoutIcon />
                    Logout
                </button> */}
            </nav>
        </aside>
    );
}
