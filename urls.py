from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter, DefaultRouter
from bay.views import BayViewSet, ToolViewSet, ProjectViewSet, ImageViewSet, MailerView, LoggingView, logging_view, utilization, ToolPDFView, export_console_xls, export_tool_xls, export_project_xls, export_user_xls, export_user_raw_xls,api_trends, tools_report, trends_pie

router = SimpleRouter()

router.register(
    'bay', BayViewSet, base_name="bay"
)

toolrouter = SimpleRouter()

toolrouter.register(
    '', ToolViewSet, base_name="tools"
)
# router.register(
#     'temperature', TemperatureViewSet, base_name="temperatureviewset"
# )

projectrouter = SimpleRouter()

projectrouter.register(
    '', ProjectViewSet, base_name="tools"
)

toolimage = SimpleRouter()

toolimage.register(
    '', ImageViewSet, base_name="image"
)
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'^bayinfo/', BayViewSet.as_view(
        {'get': 'get_bay_info'}), name='get_bay_info'),
    url(r'^bay/(?P<bid>[0-9]+)/tools', include(toolrouter.urls)),
    url(r'^tools', include(toolrouter.urls)),
    url(r'^projects', include(projectrouter.urls)),
    url(r'^image', include(toolimage.urls)),
    url(r'mailsend/$',MailerView.as_view(),name="sasa"),
    url(r'log/$',LoggingView.as_view(),name="log"),
    url(r'logging_view/$',logging_view,name="logging_view"),
    url(r'tool-utilization/$',utilization,name="tool_utilization"),
    url(r'export-tools/$',ToolPDFView.as_view(),name="export_tools"),
    url(r"^export_console_xls/$", export_console_xls, name="export_console_xls"),
    url(r"^export_tool_xls/$", export_tool_xls, name="export_tool_xls"),
    url(r"^export_project_xls/$", export_project_xls, name="export_project_xls"),
    url(r"^export_user_xls/$", export_user_xls, name="export_user_xls"),
    url(r"^export_user_raw_xls/$", export_user_raw_xls, name="export_user_raw_xls"),
    url(r"^api_trends_overall/$", api_trends, name="api_trends"),
    url(r"^export_tools/(?P<tool_id>[0-9]+)/", tools_report, name="too_reports"),
]
