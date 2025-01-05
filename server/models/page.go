package models

type Page struct {
	Id              string    `json:"id"`
	WorkspaceId     string    `json:"workspaceId" bson:"workspaceId"`
	ProjectId       string    `json:"projectId" bson:"projectId"`
	Title           string    `json:"title"`
	Content         string    `json:"content"`
	IsPublic        bool      `json:"isPublic"`
	DefaultEndpoint string    `json:"defaultEndpoint"`
	CreatedBy       string    `json:"createdBy" bson:"createdBy"`
	Workspace       Workspace `json:"workspace" bson:"-"`
	CreatedByUser   User      `json:"createdByUser" bson:"-"`
	BasicDate       `bson:",inline"`
}
