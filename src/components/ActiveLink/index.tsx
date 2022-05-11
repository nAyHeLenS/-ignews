import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps{
    children: ReactElement;
    asActiveClassName: string;
}

export function ActiveLink({ children, asActiveClassName, ...rest }: ActiveLinkProps){
    const { asPath } =  useRouter()

    const className = asPath === rest.href ? asActiveClassName : ''
    // a classe vai na ancora (children)
    
    return (
        <Link {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    )
}
