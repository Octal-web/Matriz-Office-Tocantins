import { sitePath } from '@/urls';

export const CustomLink = ({ href = sitePath(), to = '', children, onClick, ...props }) => (
    <a href={href + to} onClick={onClick} {...props}>{children}</a>
);
