package services

import (
	"context"
	"errors"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kickof/database"
	"kickof/models"
	"time"
)

const BlogTopicCollection = "blog_topics"

func GetBlogTopics(filters bson.M, opt *options.FindOptions) []models.BlogTopic {
	results := make([]models.BlogTopic, 0)

	cursor := database.Find(BlogTopicCollection, filters, opt)
	if cursor == nil {
		return results
	}
	for cursor.Next(context.Background()) {
		var data models.BlogTopic
		err := cursor.Decode(&data)
		if err == nil {
			results = append(results, data)
		}

	}

	return results
}

func GetBlogTopicsWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetBlogTopics(filters, opt)

	count := database.Count(BlogTopicCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateBlogTopic(params models.BlogTopic) (bool, error) {
	_, err := database.InsertOne(BlogTopicCollection, params)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetBlogTopic(filter bson.M, opts *options.FindOneOptions) *models.BlogTopic {
	var data models.BlogTopic
	err := database.FindOne(BlogTopicCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdateBlogTopic(id string, BlogTopic interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(BlogTopicCollection, filters, BlogTopic)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteBlogTopic(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(BlogTopicCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func CreateManyBlogTopic(params []string) (bool, error) {
	data := make([]interface{}, 0)
	for _, val := range params {
		topic := models.BlogTopic{
			Id:    uuid.New().String(),
			Topic: val,
			BasicDate: models.BasicDate{
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			},
		}

		data = append(data, topic)
	}

	_, err := database.InsertMany(BlogTopicCollection, data)
	if err != nil {
		return false, err
	}

	return true, nil
}
