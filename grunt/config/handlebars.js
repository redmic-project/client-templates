module.exports = function(grunt) {

	grunt.config('handlebars', {
		compile: {
			options: {
				namespace: false,
				amd: ['templates'],
				compilerOptions: {
					knownHelpers: {
						// legacy (ir eliminando)
						DetailsTitle: true,
						PropertiesAtlas: true,
						TimeCumulative: true,
						Progress: true,
						qualityControl: true,
						GroupIcon: true,
						GroupIconInspire: true,
						Image: true,
						URL: true,
						UrlWebcam: true,
						TextURL: true,
						Icon: true,
						Href: true,
						Badge: true,
						Email: true,
						Array: true,
						Hierarchy: true,
						listSeparate: true,
						RowColBibliography: true,
						RowColActivityCatalog: true,
						RowColSpeciesCatalog: true,
						RowColServiceOGCCatalog: true,
						URLDetails: true,
						ancestorsSpecies: true,
						ancestorsActivity: true,
						insertButton: true,
						Date: true,
						DateTime: true,
						lang: true,
						Translate: true,
						ChartsHierarchicalListParse: true,
						TranslateUncapitalize: true,
						ImageDetails: true,
						ImageDetailsPublic: true,
						ChkIsNull: true,
						Status: true,
						PDFHref: true,
						toFixed: true,
						Keyword: true,
						ArrayString: true,
						Classifications: true,
						bold: true,
						IterateJSON: true,
						ProtocolsServiceOGC: true,
						DownloadServiceOGC: true,
						breaklines: true,
						textOrSpace: true,
						PrintProperty: true,
						SafeUrl: true,
						concat: true,
						showBoolean: true,
						reverse: true,
						PathLength: true,
						Parents: true,
						Depth: true,
						IsValidZ: true,
						ExpandOrCollapse: true,
						ColorRamp: true,

						// customParser
						ActivityOpenStatus: true,
						ActivityAccessibilityStatus: true,
						ActivityInspireTheme: true,
						ActivityResources: true,
						ActivityStarred: true,
						ServiceOGCAttribution: true,
						ServiceOGCLegend: true,

						// string
						Capitalize: true
					},
					knownHelpersOnly: true
				}
			},
			files: {
				'dist/UnitInfo.js': 'src/Unit/Info.hbs'
				, 'dist/UnitList.js': 'src/Unit/List.hbs'
				, 'dist/AccessList.js': 'src/Access/List.hbs'
				, 'dist/UnitFilter.js': 'src/Unit/Filter.hbs'
				, 'dist/InitialTitle.js': 'src/Initial/Title.hbs'
				, 'dist/InitialInfo.js': 'src/Initial/Info.hbs'
				, 'dist/TimeSeriesDefinitionInfo.js': 'src/TimeSeriesDefinition/Info.hbs'
				, 'dist/TimeSeriesDefinitionList.js': 'src/TimeSeriesDefinition/List.hbs'
				, 'dist/ActivityInfoHelp.js': 'src/Activity/InfoHelp.hbs'
				, 'dist/ActivityInfo.js': 'src/Activity/Info.hbs'
				, 'dist/ActivityList.js': 'src/Activity/List.hbs'
				, 'dist/ActivityFilter.js': 'src/Activity/Filter.hbs'
				, 'dist/ActivityLayerList.js': 'src/Activity/LayerList.hbs'
				, 'dist/ActivityTypeInfo.js': 'src/ActivityType/Info.hbs'
				, 'dist/ActivityTypeList.js': 'src/ActivityType/List.hbs'
				, 'dist/ActivityTypeDetails.js': 'src/ActivityType/Details.hbs'
				, 'dist/AnimalList.js': 'src/Animal/List.hbs'
				, 'dist/AnimalListExpand.js': 'src/Animal/ListExpand.hbs'
				, 'dist/TrackingPrimaryList.js': 'src/Tracking/PrimaryList.hbs'
				, 'dist/TrackingSecondaryList.js': 'src/Tracking/SecondaryList.hbs'
				, 'dist/TrackingPlatformList.js': 'src/Tracking/PlatformList.hbs'
				, 'dist/CalibrationInfo.js': 'src/Calibration/Info.hbs'
				, 'dist/CalibrationList.js': 'src/Calibration/List.hbs'
				, 'dist/ProjectInfo.js': 'src/Project/Info.hbs'
				, 'dist/ProjectList.js': 'src/Project/List.hbs'
				, 'dist/ProjectFilter.js': 'src/Project/Filter.hbs'
				, 'dist/ProgramInfo.js': 'src/Program/Info.hbs'
				, 'dist/ProgramList.js': 'src/Program/List.hbs'
				, 'dist/ProgramFilter.js': 'src/Program/Filter.hbs'
				, 'dist/PlatformFilter.js': 'src/Platform/Filter.hbs'
				, 'dist/PlatformInfo.js': 'src/Platform/Info.hbs'
				, 'dist/PlatformList.js': 'src/Platform/List.hbs'
				, 'dist/PlatformSet.js': 'src/Platform/Set.hbs'
				, 'dist/ParameterInfo.js': 'src/Parameter/Info.hbs'
				, 'dist/ParameterList.js': 'src/Parameter/List.hbs'
				, 'dist/ParameterFilter.js': 'src/Parameter/Filter.hbs'
				, 'dist/PermissionsList.js': 'src/Permissions/List.hbs'
				, 'dist/OrganisationFilter.js': 'src/Organisation/Filter.hbs'
				, 'dist/OrganisationInfo.js': 'src/Organisation/Info.hbs'
				, 'dist/OrganisationList.js': 'src/Organisation/List.hbs'
				, 'dist/OrganisationSet.js': 'src/Organisation/Set.hbs'
				, 'dist/ResourceSet.js': 'src/Resource/Set.hbs'
				, 'dist/MetricsDefinitionInfo.js': 'src/MetricsDefinition/Info.hbs'
				, 'dist/MetricsDefinitionList.js': 'src/MetricsDefinition/List.hbs'
				, 'dist/DocumentFilter.js': 'src/Document/Filter.hbs'
				, 'dist/DocumentAuthFailed.js': 'src/Document/AuthFailed.hbs'
				, 'dist/DocumentNotAvailable.js': 'src/Document/NotAvailable.hbs'
				, 'dist/DocumentInfo.js': 'src/Document/Info.hbs'
				, 'dist/DocumentList.js': 'src/Document/List.hbs'
				, 'dist/DeviceInfo.js': 'src/Device/Info.hbs'
				, 'dist/DeviceList.js': 'src/Device/List.hbs'
				, 'dist/DataDefinitionInfo.js': 'src/DataDefinition/Info.hbs'
				, 'dist/DataDefinitionList.js': 'src/DataDefinition/List.hbs'
				, 'dist/DataDefinitionObjectCollectingLabelColumn.js': 'src/DataDefinition/ObjectCollectingLabelColumn.hbs'
				, 'dist/ContactFilter.js': 'src/Contact/Filter.hbs'
				, 'dist/ContactInfo.js': 'src/Contact/Info.hbs'
				, 'dist/ContactList.js': 'src/Contact/List.hbs'
				, 'dist/ContactSet.js': 'src/Contact/Set.hbs'
				, 'dist/ContactTitle.js': 'src/Contact/Title.hbs'
				, 'dist/ConditionInfo.js': 'src/Condition/Info.hbs'
				, 'dist/ConditionList.js': 'src/Condition/List.hbs'
				, 'dist/SpeciesFilter.js': 'src/Species/Filter.hbs'
				, 'dist/SpeciesInfo.js': 'src/Species/Info.hbs'
				, 'dist/SpeciesList.js': 'src/Species/List.hbs'
				, 'dist/SpeciesTitle.js': 'src/Species/Title.hbs'
				, 'dist/ServiceOGCActivityList.js': 'src/ServiceOGC/ActivityList.hbs'
				, 'dist/ServiceOGCList.js': 'src/ServiceOGC/List.hbs'
				, 'dist/ServiceOGCAtlasList.js': 'src/ServiceOGC/AtlasList.hbs'
				, 'dist/ServiceOGCAtlasDetails.js': 'src/ServiceOGC/AtlasDetails.hbs'
				, 'dist/ServiceOGCTitle.js': 'src/ServiceOGC/Title.hbs'
				, 'dist/ServiceOGCInfo.js': 'src/ServiceOGC/Info.hbs'
				, 'dist/ServiceOGCSourceInfo.js': 'src/ServiceOGC/SourceInfo.hbs'
				, 'dist/ServiceOGCImage.js': 'src/ServiceOGC/Image.hbs'
				, 'dist/TaxonList.js': 'src/Taxon/List.hbs'
				, 'dist/PlaceNamesList.js': 'src/PlaceNames/List.hbs'
				, 'dist/LoadingArrows.js': 'src/Loading/Arrows.hbs'
				, 'dist/LoadingCustom.js': 'src/Loading/Custom.hbs'
				, 'dist/LoadingEmpty.js': 'src/Loading/Empty.hbs'
				, 'dist/LoadingFailed.js': 'src/Loading/Failed.hbs'
				, 'dist/LoadingWaves.js': 'src/Loading/Waves.hbs'
				, 'dist/SpeciesDistributionPopup.js': 'src/SpeciesDistribution/Popup.hbs'
				, 'dist/SpeciesDistributionPopupList.js': 'src/SpeciesDistribution/PopupList.hbs'
				, 'dist/SpeciesDistributionPrimaryList.js': 'src/SpeciesDistribution/PrimaryList.hbs'
				, 'dist/SpeciesDistributionCitation.js': 'src/SpeciesDistribution/Citation.hbs'
				, 'dist/CitationPopup.js': 'src/Citation/Popup.hbs'
				, 'dist/CitationList.js': 'src/Citation/List.hbs'
				, 'dist/CitationListExpand.js': 'src/Citation/ListExpand.hbs'
				, 'dist/WormsList.js': 'src/Worms/List.hbs'
				, 'dist/AtlasSecundaryList.js': 'src/Atlas/SecundaryList.hbs'
				, 'dist/AtlasList.js': 'src/Atlas/List.hbs'
				, 'dist/AtlasPrimaryList.js': 'src/Atlas/PrimaryList.hbs'
				, 'dist/DomainList.js': 'src/Domain/List.hbs'
				, 'dist/CountryList.js': 'src/Country/List.hbs'
				, 'dist/SelectionList.js': 'src/Selection/List.hbs'
				, 'dist/MisidentificationList.js': 'src/Misidentification/List.hbs'

				, 'dist/StatisticsList.js': 'src/Statistics/List.hbs'
				, 'dist/NotificationList.js': 'src/Notification/List.hbs'
				, 'dist/StatisticsTitle.js': 'src/Statistics/Title.hbs'

				, 'dist/SpecimenTagSet.js': 'src/SpecimenTag/Set.hbs'
				, 'dist/RecoverySet.js': 'src/Recovery/Set.hbs'
				, 'dist/DefaultList.js': 'src/Default/List.hbs'
				, 'dist/DefaultDetailsTitle.js': 'src/Default/DetailsTitle.hbs'

				, 'dist/AreaPopup.js': 'src/Area/Popup.hbs'
				, 'dist/AreaList.js': 'src/Area/List.hbs'

				, 'dist/InfrastructurePopup.js': 'src/Infrastructure/Popup.hbs'
				, 'dist/InfrastructureList.js': 'src/Infrastructure/List.hbs'
				, 'dist/InfrastructureAttributesList.js': 'src/Infrastructure/AttributesList.hbs'

				, 'dist/SurveyStationPopup.js': 'src/SurveyStation/Popup.hbs'
				, 'dist/SurveyStationTimeseriesPopup.js': 'src/SurveyStation/TimeseriesPopup.hbs'
				, 'dist/SurveyStationList.js': 'src/SurveyStation/List.hbs'
				, 'dist/SurveyStationDataList.js': 'src/SurveyStation/DataList.hbs'
				, 'dist/SurveyStationDashboard.js': 'src/SurveyStation/Dashboard.hbs'

				, 'dist/ObjectCollectionPopup.js': 'src/ObjectCollection/Popup.hbs'
				, 'dist/ObjectCollectionList.js': 'src/ObjectCollection/List.hbs'

				, 'dist/UserTitle.js': 'src/User/Title.hbs'
				, 'dist/UserImage.js': 'src/User/Image.hbs'
				, 'dist/UserTopbarMenu.js': 'src/User/TopbarMenu.hbs'
				, 'dist/UserEmail.js': 'src/User/Email.hbs'
				, 'dist/UserName.js': 'src/User/Name.hbs'
				, 'dist/UserSector.js': 'src/User/Sector.hbs'
				, 'dist/UserPassword.js': 'src/User/Password.hbs'

				, 'dist/ChartCategoryTooltip.js': 'src/Chart/CategoryTooltip.hbs'
				, 'dist/ChartTemporalTooltip.js': 'src/Chart/TemporalTooltip.hbs'
				, 'dist/ChartList.js': 'src/Chart/List.hbs'
				, 'dist/ChartListHierarchical.js': 'src/Chart/ListHierarchical.hbs'
				, 'dist/ChartEmpty.js': 'src/Chart/Empty.hbs'

				, 'dist/RelationDataChildList.js': 'src/RelationData/ChildList.hbs'
				, 'dist/RelationDataParentList.js': 'src/RelationData/ParentList.hbs'
				, 'dist/RelationDataClassificationForm.js': 'src/RelationData/ClassificationForm.hbs'
				, 'dist/RelationDataParameterForm.js': 'src/RelationData/ParameterForm.hbs'

				, 'dist/SiteInfo.js': 'src/Site/Info.hbs'
				, 'dist/SitePopup.js': 'src/Site/Popup.hbs'
				, 'dist/MeasurementChildList.js': 'src/Measurement/ChildList.hbs'
				, 'dist/MeasurementParentList.js': 'src/Measurement/ParentList.hbs'

				, 'dist/ObjectTypeList.js': 'src/ObjectType/List.hbs'
				, 'dist/LineTypeList.js': 'src/LineType/List.hbs'
				, 'dist/ThematicTypeList.js': 'src/ThematicType/List.hbs'
				, 'dist/ThematicTypeSet.js': 'src/ThematicType/Set.hbs'

				, 'dist/ProtocolsSet.js': 'src/Protocols/Set.hbs'
				, 'dist/DownloadsSet.js': 'src/Downloads/Set.hbs'

				, 'dist/WhatIsRedmicLongTermChallenge.js': 'src/WhatIsRedmic/LongTermChallenge.hbs'
				, 'dist/WhatIsRedmicInfoType.js': 'src/WhatIsRedmic/InfoType.hbs'
				, 'dist/WhatIsRedmicUserType.js': 'src/WhatIsRedmic/UserType.hbs'
				, 'dist/WhatIsRedmicDataPolicy.js': 'src/WhatIsRedmic/DataPolicy.hbs'
				, 'dist/WhatIsRedmicProductsAndServices.js': 'src/WhatIsRedmic/ProductsAndServices.hbs'
				, 'dist/WhatIsRedmicInteroperability.js': 'src/WhatIsRedmic/Interoperability.hbs'

				, 'dist/FilterForm.js': 'src/Filter/Form.hbs'
				, 'dist/FilterSpeciesForm.js': 'src/Filter/SpeciesForm.hbs'
				, 'dist/FilterColorRamp.js': 'src/Filter/ColorRamp.hbs'
				, 'dist/GenericViewerLayerList.js': 'src/GenericViewer/LayerList.hbs'

				, 'dist/ActivityCategoriesNoExist.js': 'src/ActivityCategories/NoExist.hbs'

				, 'dist/RealTimeInfo.js': 'src/RealTime/Info.hbs'

				, 'dist/ProductList.js': 'src/Product/List.hbs'
			}
		}
	});
};
