package services

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kickof/database"
	"kickof/models"
)

const BlogPostCollection = "blog_posts"

func GetBlogPosts(filters bson.M, opt *options.FindOptions) []models.BlogPost {
	results := make([]models.BlogPost, 0)

	cursor := database.Find(BlogPostCollection, filters, opt)
	if cursor == nil {
		return results
	}
	for cursor.Next(context.Background()) {
		var data models.BlogPost
		err := cursor.Decode(&data)
		if err == nil {
			results = append(results, data)
		}

	}

	return results
}

func GetBlogPostsWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetBlogPosts(filters, opt)

	count := database.Count(BlogPostCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateBlogPost(BlogPost models.BlogPost) (bool, error) {
	_, err := database.InsertOne(BlogPostCollection, BlogPost)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetBlogPost(filter bson.M, opts *options.FindOneOptions) *models.BlogPost {
	var data models.BlogPost
	err := database.FindOne(BlogPostCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdateBlogPost(id string, BlogPost interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(BlogPostCollection, filters, BlogPost)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteBlogPost(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(BlogPostCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}
