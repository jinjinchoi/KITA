import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Redirect, Res } from '@nestjs/common';
import { FaqService } from './faq.service';
import { IFaqDto } from './dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post("/admin")
  // 글작성 후 페이지 넘김
  @Redirect('http://127.0.0.1:5500/nestjsProject/frontend/html/faq/customercenter.html')
  create(@Body('faqTitle') faqTitle:string, @Body('faqContent') faqContent: string){
    return this.faqService.create(faqTitle, faqContent);
  }

  @Get("/:q")
  async queryFind(@Query("q") q:string):Promise<IFaqDto[]>{
    console.log(await this.faqService.queryFind(q))
    return await this.faqService.queryFind(q);
  }

  // faq 글 전체 조회
  @Get()
  async findAll():Promise<IFaqDto[]>{
    return await this.faqService.findAll();
  }

  // 글 수정 전 요청
  @Get("/adminfaq/:id")
  async modifyFindOne(@Query("modify",ParseIntPipe) id:number){
    return await this.faqService.modifyFindOne(id);
  }

  // 글 수정
  @Put("/adminfaq/:id")
  async update(@Param('id', ParseIntPipe) id:number, @Body('faqTitle') faqTitle:string, @Body('faqContent') faqContent:string){
    return await this.faqService.update(id, faqTitle, faqContent);
  }

  // 삭제
  @Delete('/:id')
  delete(@Param('id') id:number):Promise<number>{
    return this.faqService.delete(id);
  }
}