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

const PageCollection = "pages"

func GetPages(filters bson.M, opt *options.FindOptions, includeDetail bool) []models.Page {
	results := make([]models.Page, 0)

	cursor := database.Find(PageCollection, filters, opt)
	if cursor == nil {
		return results
	}
	for cursor.Next(context.Background()) {
		var data models.Page
		err := cursor.Decode(&data)
		if err == nil {
			if includeDetail {
				if data.WorkspaceId != "" {
					workspace := GetWorkspace(bson.M{"id": data.WorkspaceId}, nil)
					if workspace != nil {
						data.Workspace = *workspace
					}
				}

				if data.CreatedBy != "" {
					user := GetUser(bson.M{"id": data.CreatedBy}, options.FindOne().SetProjection(bson.D{{"password", 0}}))
					if user != nil {
						data.CreatedByUser = *user
					}
				}
			}

			results = append(results, data)
		}

	}

	return results
}

func GetPagesWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetPages(filters, opt, true)

	count := database.Count(PageCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreatePage(Page models.Page) (bool, error) {
	_, err := database.InsertOne(PageCollection, Page)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetPage(filter bson.M, opts *options.FindOneOptions) *models.Page {
	var data models.Page
	err := database.FindOne(PageCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdatePage(id string, Page interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(PageCollection, filters, Page)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeletePage(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(PageCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}
