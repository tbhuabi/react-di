import { Injector, NullInjector, Provider, ReflectiveInjector, Scope } from '@tanbo/di';
import React, { createContext, useContext, Props } from 'react';

const InjectorContext = createContext(new NullInjector())

export * from '@tanbo/di'

export interface InjectorProps extends Props<any> {
  context?: Provider[]
}

export function useInjectContext(providers: Provider[] = [], scope?: Scope): [Injector, Function] {
  const parent = useContext(InjectorContext)
  const injector = new ReflectiveInjector(parent, providers, scope)
  return [injector, function (props: Props<any>) {
    return (
      <InjectorContext.Provider value={injector}>
        {
          props.children
        }
      </InjectorContext.Provider>
    )
  }]
}


export function RootInjectorContext(props: InjectorProps) {
  const injector = Array.isArray(props.context) ?
    new ReflectiveInjector(new NullInjector(), props.context) :
    (props.context || new ReflectiveInjector(new NullInjector(), []))
  return (
    <InjectorContext.Provider value={injector}>
      {
        props.children
      }
    </InjectorContext.Provider>
  )
}
