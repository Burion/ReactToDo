using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using ReactSample.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        readonly IListService _listService;
        readonly IMapper _mapper;

        public ListsController(IListService listService, IMapper mapper)
        {
            _listService = listService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<ListDto> Get()
        {
            return new ListDto();
        }

        [HttpPost]
        public ActionResult<ListDto> Post([FromBody] ListViewModel model)
        {
            var listToAdd = _mapper.Map<ListViewModel, ListDto>(model);
            var addedList = _listService.AddList(listToAdd);
            
            return addedList;
        }

        [HttpPut]
        public ActionResult<ListDto> Put([FromBody] ListViewModel model)
        {
            var listToEdit = _mapper.Map<ListViewModel, ListDto>(model);
            var editedList = _listService.UpdateList(listToEdit);
            
            return editedList;
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] ListViewModel model)
        {
            var listToDelete = _mapper.Map<ListViewModel, ListDto>(model);
            _listService.DeleteList(listToDelete);

            return Ok();
        }
    }
}
