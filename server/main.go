package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"kickof/config"
	"kickof/controllers"
	"kickof/database"
	"kickof/models"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file, will use system environment")
	}

	log.Println("Version: ", os.Getenv("VERSION"))

	if !database.Init() {
		log.Printf("Connected to MongoDB URI: Failure")
		return
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(static.Serve("/", static.LocalFile("./dist", true)))

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowMethods = []string{"POST", "GET", "PATCH", "OPTIONS", "DELETE"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.AllowCredentials = true
	corsConfig.MaxAge = 12 * time.Hour
	router.Use(cors.New(corsConfig))

	api := router.Group("/api")
	{
		api.GET("/version", func(c *gin.Context) {
			c.JSON(http.StatusOK, models.Response{
				Data: "KickOf Api v" + os.Getenv("VERSION"),
			})
			return
		})

		api.GET("/default", controllers.CreateDefaultData)

		api.POST("/register", controllers.SignUp)
		api.POST("/login", controllers.SignIn)
		api.GET("/refresh-token", controllers.RefreshToken)
		api.POST("/activate", controllers.Activate)

		api.GET("/page/:id", controllers.GetPageById)

		api.GET("/blog-post", controllers.GetBlogPosts)
		api.POST("/blog-post", controllers.CreateBlogPost)

		protected := api.Group("/", config.AuthMiddleware())
		{
			protected.GET("/profile", controllers.GetProfile)

			protected.GET("/project", controllers.GetProjects)
			protected.POST("/project", controllers.CreateProject)
			protected.GET("/project/members/:id", controllers.GetProjectMembers)
			protected.GET("/project/:id", controllers.GetProjectByIdOrCode)
			protected.PATCH("/project/:id", controllers.UpdateProject)
			protected.DELETE("/project/:id", controllers.DeleteProject)

			protected.GET("/page", controllers.GetPages)
			protected.POST("/page", controllers.CreatePage)
			protected.PATCH("/page/:id", controllers.UpdatePage)
			protected.DELETE("/page/:id", controllers.DeletePage)

			protected.GET("/role", controllers.GetRoles)
			protected.POST("/role", controllers.CreateRole)
			protected.GET("/role/:id", controllers.GetRoleById)
			protected.PATCH("/role/:id", controllers.UpdateRole)
			protected.DELETE("/role/:id", controllers.DeleteRole)
			protected.POST("/role/attach-permission", controllers.AttachPermissionsToRole)

			protected.GET("/state", controllers.GetStates)
			protected.POST("/state", controllers.CreateState)
			protected.GET("/state/:id", controllers.GetStateById)
			protected.PATCH("/state/:id", controllers.UpdateState)
			protected.DELETE("/state/:id", controllers.DeleteState)

			protected.GET("/task", controllers.GetTasks)
			protected.POST("/task", controllers.CreateTask)
			protected.GET("/task/:id", controllers.GetTaskById)
			protected.PATCH("/task/:id", controllers.UpdateTask)
			protected.DELETE("/task/:id", controllers.DeleteTask)

			protected.GET("/task-label", controllers.GetTaskLabels)
			protected.POST("/task-label", controllers.CreateTaskLabel)
			protected.GET("/task-label/:id", controllers.GetTaskLabelById)
			protected.PATCH("/task-label/:id", controllers.UpdateTaskLabel)
			protected.DELETE("/task-label/:id", controllers.DeleteTaskLabel)

			protected.GET("/workspace", controllers.GetWorkspaces)
			protected.POST("/workspace", controllers.CreateWorkspace)
			protected.GET("/workspace/members/:workspaceId", controllers.GetWorkspaceMembers)
			protected.GET("/workspace/:id", controllers.GetWorkspaceById)
			protected.PATCH("/workspace/:id", controllers.UpdateWorkspace)
			protected.DELETE("/workspace/:id", controllers.DeleteWorkspace)

			admin := protected.Group("/admin", config.AdminMiddleware())
			{
				admin.POST("/blog-topic", controllers.CreateManyBlogTopic)

				admin.POST("/blog-post", controllers.CreateBlogPost)
				admin.GET("/blog-post", controllers.GetBlogPosts)
				admin.GET("/blog-post/:id", controllers.GetBlogPostById)
				admin.PATCH("/blog-post/:id", controllers.UpdateBlogPost)
				admin.DELETE("/blog-post/:id", controllers.DeleteBlogPost)
			}
		}
	}

	port := "8000"
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}

	err = router.Run(":" + port)
	if err != nil {
		return
	}
}
