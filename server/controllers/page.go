package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/models"
	"kickof/services"
	"net/http"
	"time"
)

func GetPages(c *gin.Context) {
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

	results := services.GetPagesWithPagination(filters, opts, query)

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreatePage(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)

	var request models.Page
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(400, models.Response{Data: err.Error()})
		return
	}

	request.Id = uuid.New().String()
	request.DefaultEndpoint = request.ProjectId + "/page" + request.Id
	request.CreatedBy = profile.Id
	request.CreatedAt = time.Now()
	request.UpdatedAt = time.Now()

	_, err = services.CreatePage(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetPageById(c *gin.Context) {
	id := c.Param("id")

	result := services.GetPage(bson.M{"id": id}, nil)
	if result == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdatePage(c *gin.Context) {
	id := c.Param("id")

	data := services.GetPage(bson.M{"id": id}, nil)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request models.Page

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdatePage(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeletePage(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeletePage(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
