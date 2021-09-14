(this["webpackJsonppokemon-spa"]=this["webpackJsonppokemon-spa"]||[]).push([[0],{104:function(n,e,t){"use strict";t.r(e);var o,i,r,a,c,s,l,d,m,b,p,j,u,f,x,h,g,O,k=t(3),v=t.n(k),y=t(59),w=t.n(y),_=(t(87),t(9)),C=t(30),F=t(12),N=t(11),P=t(2),S=N.a.section(o||(o=Object(_.a)(["\n  background-color: #A82F2F;\n  padding: 0.5rem 1rem;\n\n  > ul {\n    display: flex;\n    flex-direcion: row;\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    \n    > li {\n      flex: 1;\n\n      &:not(:first-of-type) {\n        margin-left: 1rem;\n      }\n\n      > a {\n        color: white;\n        text-decoration: none;\n      }\n    }\n  }\n"]))),D=function(){return Object(P.jsx)(S,{children:Object(P.jsxs)("ul",{children:[Object(P.jsx)("li",{children:Object(P.jsx)(C.b,{to:"/",children:"Pokemon List"})}),Object(P.jsx)("li",{children:Object(P.jsx)(C.b,{to:"/my-pokemon",children:"My Pokemon"})})]})})},A=t(116),L=t(117),B=function(){return JSON.parse(window.localStorage.getItem("myPokemonList")||"[]")},E=N.a.div(i||(i=Object(_.a)(["\n  display: flex;\n  align-items: center;\n  position: relative;\n  min-height: 80px;\n\n  &.tamed:before {\n    content: '';\n    display: block;\n    position: absolute;\n    background-image: url('/pokeball-logo.svg');\n    top: 0;\n    left: 0;\n    opacity: 0.6;\n    width: 60px;\n    height: 60px;\n  }\n\n  > img {\n    position: relative;\n    max-width: 80px;\n  }\n\n  > div {\n    padding-left: 4px;\n\n    .box-label {\n      font-family: Consolas;\n    }\n\n    a {\n      font-size: 0.7rem;\n      background-color: #38B0B8;\n      text-decoration: none;\n      padding: 2px 4px 4px 4px;\n    }\n  }\n\n  &:not(.tamed) {\n    .box-label {\n      text-transform: capitalize;\n    }\n  }\n"]))),I=function(n){var e=Object(A.a)(r||(r=Object(_.a)(["\n    query GetPokemonDetail($name: String!) {\n      pokemon(name: $name) {\n        id\n        name\n        sprites {\n          front_default\n        }\n      }\n    }\n  "]))),t=!!n.pokemon.pokemonName,o=Object(L.a)(e,{variables:{name:n.pokemon.name}}),i=o.loading,a=o.error,c=o.data;return i?Object(P.jsx)(P.Fragment,{}):a?Object(P.jsxs)("div",{children:["Error: ",JSON.stringify(a)]}):Object(P.jsxs)(E,{className:"pokemon-box ".concat(t&&"tamed"),children:[Object(P.jsx)("img",{alt:"sprite",src:c.pokemon.sprites.front_default}),Object(P.jsxs)("div",{children:[Object(P.jsx)("span",{className:"box-label",children:n.pokemon.pokemonName||n.pokemon.name}),Object(P.jsx)("br",{}),Object(P.jsx)(C.b,{to:"/detail/"+n.pokemon.name,children:"Detail"})]})]})},$=N.a.section(a||(a=Object(_.a)(["\n  > table {\n    width: 100%;\n    border-collapse: separate;\n    border-spacing: 0 8px;\n\n    tbody > tr {\n      background: rgb(203,67,66);\n      background: linear-gradient(0deg, rgba(203,67,66,1) 0%, rgba(168,47,47,1) 37%, rgba(168,47,47,1) 100%);\n      color: white;\n      border-spacing: 1rem;\n\n      * {\n        color: #FDFDFD;\n      }\n\n      td > img {\n        max-height: 80px;\n      }\n    }\n  }\n\n  .button-group {\n    display: flex;\n    margin-top: 8px;\n\n    > *:not(:first-of-type) {\n      margin-left: 1rem;\n    }\n\n    > button {\n      flex: 2;\n    }\n\n    > span {\n      flex: 1;\n      text-align: center;\n    }\n  }\n"]))),J=N.a.button(c||(c=Object(_.a)(["\n  padding: 8px 4px;\n  border: none;\n  background-color: #303030;\n  color: #FDFDFD;\n"]))),q=function(){var n=Object(k.useRef)(B()),e=Object(A.a)(s||(s=Object(_.a)(["\n    query GetPokemonList($limit: Int!, $offset: Int!) {\n      pokemons(limit: $limit, offset: $offset) {\n        prevOffset\n        nextOffset,\n        results {\n          id,\n          url,\n          name,\n          image,\n        }\n      }\n    }\n  "]))),t=Object(L.a)(e,{variables:{limit:10,offset:0}}),o=t.loading,i=t.error,r=t.data,a=t.fetchMore,c=function(n){a({variables:{offset:n,limit:10},updateQuery:function(n,e){var t=e.fetchMoreResult;return t||n}})};return o?Object(P.jsx)("div",{children:"Loading..."}):i?Object(P.jsxs)("div",{children:["Error: ",i]}):Object(P.jsxs)($,{children:[Object(P.jsxs)("table",{children:[Object(P.jsx)("thead",{children:Object(P.jsxs)("tr",{children:[Object(P.jsx)("th",{children:"Pokemon"}),Object(P.jsx)("th",{children:"Count"})]})}),Object(P.jsx)("tbody",{children:r.pokemons.results.map((function(e){return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:Object(P.jsx)(I,{pokemon:e})}),Object(P.jsxs)("td",{children:["(owned: ",(t=e,n.current.filter((function(n){return n.id===t.id})).length),")"]})]},e.name);var t}))})]}),Object(P.jsxs)("div",{className:"button-group",children:[Object(P.jsx)(J,{type:"button",disabled:10===r.pokemons.nextOffset,onClick:function(){return c(r.pokemons.prevOffset)},children:"Previous"}),Object(P.jsx)(J,{type:"button",onClick:function(){return c(r.pokemons.nextOffset)},children:"Next"})]})]})},z=t(53),M=t(66),G=t(44),R={normal:"#A8A77A",fire:"#EE8130",water:"#6390F0",electric:"#F7D02C",grass:"#7AC74C",ice:"#96D9D6",fighting:"#C22E28",poison:"#A33EA1",ground:"#E2BF65",flying:"#A98FF3",psychic:"#F95587",bug:"#A6B91A",rock:"#B6A136",ghost:"#735797",dragon:"#6F35FC",dark:"#705746",steel:"#B7B7CE",fairy:"#D685AD"},T=N.a.span(d||(d=Object(_.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2px 8px;\n  text-transform: uppercase;\n  color: white;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-family: Consolas;\n  ",";\n"])),(function(n){return Object(G.a)(l||(l=Object(_.a)(["\n  background-color: ","\n"])),R[n.type])})),Q=N.a.div(m||(m=Object(_.a)(["\n  border: 1px solid #303030;\n  background-color: #F0f0f0;\n  border-radius: 4px;\n  font-family: Consolas;\n  text-transform: capitalize;\n  display: flex;\n  flex-direction: column;\n\n  > span,\n  > p {\n    padding: 2px 4px;\n  }\n\n  > span {\n    border-bottom: 1px solid #303030;\n  }\n\n  > p {\n    margin: 0;\n    font-size: 0.8em;\n  }\n"]))),V=function(n){var e=Object(A.a)(b||(b=Object(_.a)(["\n    query GetAbility($ability: String!) {\n      ability(ability: $ability) {\n        response\n      }\n    }\n  "]))),t=Object(L.a)(e,{variables:{ability:n.ability.name}}),o=t.loading,i=t.error,r=t.data;return o?Object(P.jsx)("div",{children:"Loading..."}):i?Object(P.jsxs)("div",{children:["Error: ",JSON.stringify(i)]}):Object(P.jsxs)(Q,{children:[Object(P.jsx)("span",{children:n.ability.name}),Object(P.jsx)("p",{children:r.ability.response.effect_entries.find((function(n){return"en"===n.language.name})).short_effect})]})},H=t(50),K=t.n(H),U=t(51),W=t.n(U),X=N.a.button(p||(p=Object(_.a)(["\n  display: inline-flex;\n  align-items: center;\n\n  > img {\n    width: 40px;\n  }\n"]))),Y=function(n){var e=W()(K.a);return Object(P.jsx)("div",{children:Object(P.jsx)(X,{onClick:function(){Math.random()>=.5?e.fire({icon:"error",title:"Failed to catch",timer:1500,showConfirmButton:!1}):e.fire({icon:"success",title:"Pokemon has been caught",timer:1500,showConfirmButton:!1}).then((function(){e.fire({title:"Input pokemon name",text:"(must be unique)",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Submit",showLoaderOnConfirm:!0,preConfirm:function(t){try{var o=JSON.parse(window.localStorage.getItem("myPokemonList")||"[]");if(-1!==o.map((function(n){return n.pokemonName})).indexOf(t))throw new Error("Please choose a different name");window.localStorage.removeItem("myPokemonList"),window.localStorage.setItem("myPokemonList",JSON.stringify([].concat(Object(z.a)(o),[{pokemonName:t,id:n.pokemon.id,name:n.pokemon.name}])))}catch(i){e.showValidationMessage("Pokemon name already exist")}},allowOutsideClick:function(){return!e.isLoading()}}).then((function(n){n.isConfirmed&&e.fire({icon:"success",title:"Pokemon has been saved"})}))}))},children:Object(P.jsx)("img",{alt:"pokeball",src:"/pokeball-logo.svg"})})})},Z=N.a.section(j||(j=Object(_.a)(["\n  display: flex;\n  flex-direction: column;\n\n  > *:not(:first-child) {\n    margin-top: 1rem;\n  }\n\n  .pokemon-sprite {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    > img {\n      height: 200px;\n    }\n  }\n"]))),nn=N.a.ul(u||(u=Object(_.a)(["\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n\n  > li:not(:first-child) {\n    margin-top: 1rem;\n  }\n"]))),en=N.a.ul(f||(f=Object(_.a)(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: row;\n  list-style-type: none;\n\n  > li:not(:first-of-type) {\n    margin-left: 0.5rem\n  }\n"]))),tn=N.a.table(x||(x=Object(_.a)(["\n  tr > td {\n    border: 1px solid #303030;\n    vertical-align: top;\n    font-size: 0.75rem;\n    padding: 2px 4px;\n\n    &:first-child {\n      white-space: nowrap;\n    }\n\n    .level-grid {\n      display: grid;\n      grid-template-columns: 2em auto;\n      grid-gap: 0.5em 0;\n    }\n  }\n"]))),on=function(){var n=Object(F.e)().name,e=Object(A.a)(h||(h=Object(_.a)(["\n    query GetPokemonDetail($name: String!) {\n      pokemon(name: $name) {\n        id\n        name\n        sprites {\n          front_default\n        }\n        abilities {\n         ability {\n           name\n         } \n        }\n        types {\n          type {\n            name\n          }\n        }\n        moves {\n          move {\n            name\n          }\n          version_group_details {\n            level_learned_at\n            move_learn_method {\n              name\n            }\n            version_group {\n              name\n            }\n          }\n        }\n      }\n    }\n  "]))),t=Object(L.a)(e,{variables:{name:n}}),o=t.loading,i=t.error,r=t.data;if(o)return Object(P.jsx)("div",{children:"Loading..."});if(i)return Object(P.jsxs)("div",{children:["Error: ",JSON.stringify(i)]});var a=r.pokemon.moves.filter((function(n){return n.version_group_details.find((function(n){return"egg"===n.move_learn_method.name||"level-up"===n.move_learn_method.name}))})).map((function(n){return Object(M.a)(Object(M.a)({},n),{},{level_learned_at:Object(z.a)(new Set(n.version_group_details.map((function(n){return n.level_learned_at}))))})})).map((function(n){return{name:n.move.name,level_learned_at:n.level_learned_at.map((function(e){return{level:e,version:n.version_group_details.filter((function(n){return n.level_learned_at===e})).map((function(n){return n.version_group.name}))}})).sort((function(n,e){return n.level-e.level}))}}));return Object(P.jsxs)(Z,{children:[Object(P.jsxs)("span",{className:"pokemon-sprite",children:[Object(P.jsx)("img",{alt:"sprite",src:r.pokemon.sprites.front_default}),Object(P.jsx)(en,{children:r.pokemon.types.map((function(n){var e=n.type;return Object(P.jsx)("li",{children:Object(P.jsx)(T,{type:e.name,children:e.name})},e.name)}))})]}),Object(P.jsx)(Y,{pokemon:r.pokemon}),Object(P.jsx)(nn,{children:r.pokemon.abilities.map((function(n){var e=n.ability;return Object(P.jsx)("li",{children:Object(P.jsx)(V,{ability:e})},e.name)}))}),Object(P.jsxs)(tn,{children:[Object(P.jsx)("thead",{children:Object(P.jsxs)("tr",{children:[Object(P.jsx)("th",{children:"Move"}),Object(P.jsx)("th",{children:"Level"})]})}),Object(P.jsx)("tbody",{children:a.map((function(n){return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:n.name}),Object(P.jsx)("td",{children:Object(P.jsx)("div",{className:"level-grid",children:n.level_learned_at.map((function(n){return Object(P.jsxs)(k.Fragment,{children:[Object(P.jsx)("b",{children:n.level}),Object(P.jsxs)("span",{children:["(",n.version.join(", "),")"]})]},"".concat(n.level,"_").concat(n.version.join("")))}))})})]},n.name)}))})]})]})},rn=t(80),an=N.a.table(g||(g=Object(_.a)(["\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 8px;\n\n  tbody > tr {\n    background: rgb(48,216,80);\n    background: linear-gradient(0deg, rgba(48,216,80,1) 0%, rgba(16,168,64,1) 37%, rgba(16,168,64,1) 100%);\n    border-spacing: 1rem;\n\n    * {\n      color: #FDFDFD;\n    }\n\n    td {\n      border: none;\n\n      > button {\n        font-family: Consolas;\n        border: none;\n        background-color: #303030;\n        padding: 8px;\n      }\n    }\n  }\n"]))),cn=function(){var n=W()(K.a),e=Object(k.useState)(B()),t=Object(rn.a)(e,2),o=t[0],i=t[1],r=function(e){n.fire({icon:"question",text:"Are you sure you want to release this pokemon?",showCancelButton:!0,confirmButtonText:"Confirm",preConfirm:function(){window.localStorage.removeItem("myPokemonList");var t=o.filter((function(n){return n.pokemonName!==e.pokemonName}));window.localStorage.setItem("myPokemonList",JSON.stringify(t)),i(t),n.fire({icon:"success",title:"Pokemon has been released"})}})};return Object(P.jsx)("section",{children:Object(P.jsxs)(an,{children:[Object(P.jsx)("thead",{children:Object(P.jsxs)("tr",{children:[Object(P.jsx)("th",{children:"Pokemon"}),Object(P.jsx)("th",{children:"Action"})]})}),Object(P.jsx)("tbody",{children:o.map((function(n){return Object(P.jsxs)("tr",{children:[Object(P.jsx)("td",{children:Object(P.jsx)(I,{pokemon:n,handleRelease:r})}),Object(P.jsx)("td",{children:Object(P.jsx)("button",{type:"button",onClick:function(){return r(n)},children:"Release"})})]},n.pokemonName)}))})]})})},sn=t(114),ln=t(115),dn=t(113),mn=N.a.div(O||(O=Object(_.a)(["\n  margin: 0 1rem 1rem 1rem;\n"])));var bn=function(){var n=new sn.a({uri:"https://graphql-pokeapi.graphcdn.app/",cache:new ln.a});return Object(P.jsx)(dn.a,{client:n,children:Object(P.jsx)(C.a,{children:Object(P.jsxs)("section",{className:"App",children:[Object(P.jsx)(D,{}),Object(P.jsxs)(mn,{children:[Object(P.jsx)(F.a,{path:"/",exact:!0,component:q}),Object(P.jsx)(F.a,{path:"/detail/:name",component:on}),Object(P.jsx)(F.a,{path:"/my-pokemon",component:cn})]})]})})})},pn=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,119)).then((function(e){var t=e.getCLS,o=e.getFID,i=e.getFCP,r=e.getLCP,a=e.getTTFB;t(n),o(n),i(n),r(n),a(n)}))};w.a.render(Object(P.jsx)(v.a.StrictMode,{children:Object(P.jsx)(bn,{})}),document.getElementById("root")),pn()},87:function(n,e,t){}},[[104,1,2]]]);
//# sourceMappingURL=main.b2d48aa3.chunk.js.map