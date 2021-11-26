import { Injector, Provider, Scope } from '@tanbo/di';
import { Props } from 'react';
export * from '@tanbo/di';
export interface InjectorProps extends Props<any> {
    context?: Provider[];
}
export declare function useInjectContext(providers?: Provider[], scope?: Scope): [Injector, Function];
export declare function RootInjectorContext(props: InjectorProps): JSX.Element;
