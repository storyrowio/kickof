package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/lib"
	"kickof/models"
	"kickof/services"
	"net/http"
	"time"
)

func GetBlogPosts(c *gin.Context) {
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

	results := services.GetBlogPostsWithPagination(filters, opts, query)

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreateBlogPost(c *gin.Context) {
	var request models.BlogPost
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	request.Id = uuid.New().String()
	request.Slug = lib.SlugGenerator(request.Title)
	request.CreatedAt = time.Now()
	request.UpdatedAt = time.Now()

	_, err = services.CreateBlogPost(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetBlogPostById(c *gin.Context) {
	id := c.Param("id")

	result := services.GetBlogPost(bson.M{"id": id}, nil)
	if result == nil {
		result = services.GetBlogPost(bson.M{"slug": id}, nil)
		if result == nil {
			c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
			return
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdateBlogPost(c *gin.Context) {
	id := c.Param("id")

	data := services.GetBlogPost(bson.M{"id": id}, nil)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request models.BlogPost

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdateBlogPost(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeleteBlogPost(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeleteBlogPost(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
