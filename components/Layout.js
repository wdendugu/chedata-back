import Nav from './Nav';

export default function Layout({ children }) {
    return (
        <div className="flex">
            <Nav />
            {children}
        </div>
    );
}
