import { NullInjector, ReflectiveInjector } from '@tanbo/di';
import React, { createContext, useContext } from 'react';
const InjectorContext = createContext(new NullInjector());
export * from '@tanbo/di';
export function useInjectContext(providers = [], scope) {
    const parent = useContext(InjectorContext);
    const injector = new ReflectiveInjector(parent, providers, scope);
    return [injector, function (props) {
            return (React.createElement(InjectorContext.Provider, { value: injector }, props.children));
        }];
}
export function RootInjectorContext(props) {
    const injector = Array.isArray(props.context) ?
        new ReflectiveInjector(new NullInjector(), props.context) :
        (props.context || new ReflectiveInjector(new NullInjector(), []));
    return (React.createElement(InjectorContext.Provider, { value: injector }, props.children));
}
