type TypographyProps = {
    children: React.ReactNode
    level: 1 | 2 | 3 | 4 | 5 | 6
}

const style = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
}

const Typography = ({ children, level , ...rest}: TypographyProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return ( 
        <Tag
            className={`${style[level]} font-bold text-red-400 my-10`}
            {...rest}
        >
            {children}
        </Tag>
     );
}
 
export default Typography;