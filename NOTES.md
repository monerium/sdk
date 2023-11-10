NOTES

Setja "strict": true í sdk tsconfig?

GITHUB ACTIONS
Laga Static output fyrir typedocs

Generate a library:
npx nx generate @nrwl/js:library

Generate a publishable library
nx g @nrwl/react:lib sdk-provider --publishable --importPath @monerium/sdk-provider

Generate an app
npx nx g @nx/react:application sdk-example-react --directory sdk-example-react

Generate a component
nx g @nx/react:component libs/ui/src/my-component

- [] Add instructions to provider README

- [] Reduce stuff in package

Nota:
yarn pack && tar -xvzf _.tgz && rm -rf package _.tgz

til að tjékka hvað mun fara í npm pakka, aðallega provider pakki

LAGA:
Þegar http://localhost:5173/?code=xkEPuCdeRXmmD3brUYL3mg&state=
og það er ekkert code_verifier, hreinsa slóð!

Use when adding SDK
.release-please-manifest.json

{
"libs/sdk-react-provider": "0.0.4"
}

nx affected -t publish
