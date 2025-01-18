package controllers

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/models"
	"kickof/services"
	"net/http"
)

func GetBlogTopics(c *gin.Context) {
	var query models.Query
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	filters := query.GetQueryFind()

	if query.WorkspaceId != "" {
		filters["workspaceId"] = query.WorkspaceId
	}

	opts := query.GetOptions()

	results := services.GetBlogTopicsWithPagination(filters, opts, query)

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreateManyBlogTopic(c *gin.Context) {
	request := struct {
		Topics []string `json:"topics"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.CreateManyBlogTopic(request.Topics)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetBlogTopicById(c *gin.Context) {
	id := c.Param("id")

	result := services.GetBlogTopic(bson.M{"id": id}, nil)
	if result == nil {
		result = services.GetBlogTopic(bson.M{"slug": id}, nil)
		if result == nil {
			c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
			return
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdateBlogTopic(c *gin.Context) {
	id := c.Param("id")

	data := services.GetBlogTopic(bson.M{"id": id}, nil)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request models.BlogTopic

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdateBlogTopic(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeleteBlogTopic(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeleteBlogTopic(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
