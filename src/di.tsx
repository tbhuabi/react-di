import { Injector, NullInjector, Provider, ReflectiveInjector, Scope } from '@tanbo/di';
import { createContext, useContext, ReactNode } from 'react';

const InjectorContext = createContext(new NullInjector())

export * from '@tanbo/di'

export interface InjectorProps {
  children?: ReactNode
  context?: Provider[] | Injector
}

export interface Props {
  children?: ReactNode
}

export function useInjectContext(providers: Provider[] = [], scope?: Scope): [Injector, (props: Props) => JSX.Element] {
  const parent = useContext(InjectorContext)
  const injector = new ReflectiveInjector(parent, providers, scope)
  return [injector, function (props: Props) {
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
