#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

from graphene import ObjectType, Field, Schema
from graphene_django.debug import DjangoDebug
from v1.recipe.schema import RecipeQuery, DirectionQuery, SubRecipeQuery, RecipeMutations, DirectionMutations
from v1.recipe_groups.schema import RecipeGroupQuery, RecipeGroupMutations
from v1.news.schema import NewsQuery
from v1.ingredient.schema import IngredientGroupQuery, IngredientQuery
from v1.list.schema import ListQuery, ListMutations


class Query(
    RecipeQuery,
    SubRecipeQuery,
    DirectionQuery,
    RecipeGroupQuery,
    NewsQuery,
    IngredientGroupQuery,
    IngredientQuery,
    ListQuery,
    ObjectType,
):
    debug = Field(DjangoDebug, name='__debug')


class Mutation(
    RecipeMutations,
    RecipeGroupMutations,
    DirectionMutations,
    ListMutations,
    ObjectType
):
    pass

schema = Schema(query=Query, mutation=Mutation)

"""

query {
  allGroceryLists {
    edges {
      node {
        title
        items {
    			totalCount
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
}


mutation {
  createRecipe(
    title: "does this work",
    info: "does this work",
    source: "does this work",
    prepTime: 1,
    cookTime: 1,
    servings: 1,
    rating: 1,
  ) {
    recipe {
      id
      title
      directions {
        edges {
          node {
            id,
            title
          }
        }
      }
    }
  }
}


query {
  allCourses {
    edges {
      node {
        title
        recipeSet {
          totalCount
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
}



query {
  allRecipes(first:2) {
    edges {
      node {
        id
        title
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }

  recipe(id: "4") {
    title
  }
}

query {
  allRecipes {
    edges {
      node {
        title
      }
    }
  }
}

query loadRecipeById($id: recipes){
  recipes(recipes: $id) {
    title
  }
}



query CreateRecipeById($id: id!, $recipe: recipe!){
  createRecipe(id: $id, recipe: $recipe) {
    title
  }
}

{
  "id": "4",
  "recipe": {
    "title": "asd",
  }
}"""