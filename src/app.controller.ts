import { Controller, Get, Post, Body, Delete, Query, Headers, Put, Param, UseInterceptors, CacheInterceptor, CacheTTL, CacheKey, } from '@nestjs/common';
import { ApiHeader, getSchemaPath, ApiExtraModels, ApiQuery, ApiBasicAuth, ApiTags, ApiOkResponse, ApiBadRequestResponse,ApiOperation, ApiParam } from '@nestjs/swagger';
import { AppService} from './app.service';
import { CreateStockedRecord } from './dto/create-stocked-record.dto';
import { StockedDto } from './dto/stocked.dto';
import { StockedDetailDto } from './dto/stocked-detail.dto';
import { FruitDto } from './dto/fruit.dto';

@ApiBasicAuth()
@ApiTags('stock')
@Controller()
export class AppController {
 
  private tokenList = [];
  constructor(private readonly appService: AppService) {}
  
  @Get('api/stocks/list')
  @ApiOperation({
    description: '取得可編輯入庫資料的工單清單',
  })
  @ApiHeader({
    name: 'token',
    description: '由 api/auth/login 取得',
    required: true,
  })
  @ApiExtraModels(StockedDto)
  @ApiOkResponse({
    description: '可編輯入庫資料的工單清單',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 200,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: true,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Get dispatch successes.',
        },
        list: {
          type: 'array',
          description:'可輸入入庫資料的工單清單',
          items: {$ref: getSchemaPath(StockedDto)}
        },
        total: {
          type: 'number',
          description: '清單總筆數',
          example: '4',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '工單號碼錯誤導致編輯失敗。',
    schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            description: 'Http status code',
            example: 400,
          },
          success: {
            type: 'boolean',
            description: 'API 處理狀態',
            example: false,
          },
          message: {
            type: 'string',
            description: 'API 回覆訊息',
            example: 'Cannot find data by this id.',
          },
      },
    },
  })
  getStocksList() {
    return 'Hi';
  }
  
  @Get('api/stocks')
  @ApiHeader({
    name: 'token',
    description: '由 api/auth/login 取得',
    required: true,
  })
  @ApiQuery({
    name: 'dispatchId',
    type: 'number',
    description: '工單 index',
    required: true,
  })
  @ApiOperation({
    description: '取得單一可編輯入庫資料的工單資訊',
  })
  @ApiExtraModels(StockedDetailDto)
  @ApiOkResponse({
    description: '單一可編輯入庫資料的工單資訊',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 200,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: true,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Get dispatch successes.',
        },
        detail: {
          type: 'array',
          description: '每張工單的入庫細節',
          $ref: getSchemaPath(StockedDetailDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '工單號碼錯誤導致編輯失敗。',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 400,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: false,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Cannot find data by this id.',
        },
    },
  },
  })
  getStocks(@Body() data: CreateStockedRecord, @Query() query: string, @Headers() header: string)  {
    console.log(query['dispatchId'],header['token']);
    const dispatchId = query['dispatchId'];
    const token =header['token'] ;
    return this.appService.getStocks(dispatchId, token);;
  }
  
  @Post('api/stocks')
  @ApiHeader({
    name: 'token',
    description: '由 api/auth/login 取得',
    required: true,
  })
  @ApiQuery({
    name: 'dispatchId',
    type: 'number',
    description: '工單 index',
    required: true,
  })
  @ApiOperation({
    description: '新增單一工單的入庫資訊',
  })
  @ApiExtraModels(StockedDetailDto)
  @ApiOkResponse({
    description: '編輯成功',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 200,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: true,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Get dispatch successes.',
        },
        detail: {
          type: 'array',
          description: '每張工單的入庫細節',
          $ref: getSchemaPath(StockedDetailDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '工單號碼錯誤導致編輯失敗。',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          description: 'Http status code',
          example: 400,
        },
        success: {
          type: 'boolean',
          description: 'API 處理狀態',
          example: false,
        },
        message: {
          type: 'string',
          description: 'API 回覆訊息',
          example: 'Cannot find data by this id.',
        },
    },
  },
  })
  createStockedRecord(@Body() data: CreateStockedRecord, @Query() query: string, @Headers() header: string) {
    console.log(query['dispatchId'],header['token']);
    const dispatchId = query['dispatchId'];
    const token =header['token'] ;
    const obj = '{"dispatchId":' + dispatchId + ', "token":' + token + '}'
    return this.appService.createStockedRecord(obj);
  }

  @Get('api/healthy')
  async getHealthy() {
    return this.appService.getHealthy();
  }

  @Post('api/redis')
  async setKey() {
    return this.appService.setKey();
  }
  @Get('api/redis')
  async getKey() {
    return this.appService.getKey();
  }

  @Get('api/treasure')
  async treasure() {
    return this.appService.treasure();
  }
  
 
  @Get('api/getcache')
  async getFruitCache() {
    return this.appService.getFruitCache();
  }

 
  @Post('api/getcache')
  async updateFruitCache() {
    return this.appService.updateFruitCache();
  }

  @Delete('api/redis')
  async deleteKey() {
    return this.appService.deleteKey();
  }

  @Post('api/fruit')
  create(@Body() fruitDTO: FruitDto){
    return this.appService.addFruit(fruitDTO); //呼叫appService對資料庫新增資料
  }
  
  @Put('api/fruit/:fruitId')
  @ApiParam({
    name: 'fruitId',
    type: 'number',
    description: 'fruit index',
    required: true,
  })
  updateUserById(@Param('fruitId') id, @Body() fruitDTO: FruitDto){
    return this.appService.updateFruit(id, fruitDTO);
  }

  @Delete('api/fruit/:fruitId')
  @ApiParam({
    name: 'fruitId',
    type: 'number',
    description: 'fruit index',
    required: true,
  })
  delete(@Param('fruitId') id){
    return this.appService.deleteFruit(id);
  }

  @Get('api/test')
  async test() {
    return this.appService.getFruitsById();
  }
}



