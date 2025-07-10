Feature("Prueba GET de API rest y de Graphql")

Scenario("Prueba GET de API rest PokeAPI", async ({ I }) => {
    const response= await I.sendGetRequest(
        'https://pokeapi.co/api/v2/pokemon-species/',
    )
    I.assertEqual(response?.status, 200)
    I.assertEqual(response?.data?.results?.[0]?.name, "bulbasaur")
    I.assertToBeA(response.data?.results?.[0]?.name, "string")

})

Scenario("Prueba de query con Graphql", async ({ I }) => {
    const response = await I.sendQuery(
        `query getPokemon($name: String!){
                    pokemon(name : $name){
                        id
                        name
                        moves {
                            move {
                                name
                            }
                        }
                        types {
                            type {
                                name
                            }
                        }
                    }
                }`,

        {
            name: "pikachu",
        })

    I.assertEqual(response?.status, 200)
   // I.assertEqual(response?.data?.results?.[0]?.moves?.[0]?.move.name, "mega-punch")
    I.assertEqual(response?.data?.data?.pokemon?.types?.[0]?.type?.name, "electric")
    I.assertContain(response?.data?.data?.pokemon?.moves?.[0]?.move?.name, "punch")

})