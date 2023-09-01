import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/layout';
import { default as NextLink } from 'next/link';
import { FC } from 'react';

export interface LinkProps extends ChakraLinkProps {
  label?: string;
  route: string;
}

export const Link: FC<LinkProps> = ({
  children,
  href,
  label,
  route,
  ...props
}) => {
  return (
    <ChakraLink as={NextLink} aria-label={label} href={route} {...props}>{
      children ?? label
    }</ChakraLink>
  );
};