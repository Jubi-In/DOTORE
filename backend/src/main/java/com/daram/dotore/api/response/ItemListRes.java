package com.daram.dotore.api.response;

import com.daram.dotore.db.entity.Items;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("ItemListResponse")
public class ItemListRes extends BaseRes {

    private List<ItemListVO> data = new ArrayList<>();

    public static ItemListRes of(String result) {
        ItemListRes res = new ItemListRes();
        res.setResult(result);

        return res;
    }

    public static ItemListRes of(String result, List<Items> list) {
        ItemListRes res = new ItemListRes();
        res.setResult(result);
        for (int i = 0; i < list.size(); i++) {
            res.getData()
                .add(new ItemListVO(
                    list.get(i).getItemTrxHash(),
                    list.get(i).getTokenId(),
                    list.get(i).getItemHash(),
                    list.get(i).getItemTitle(),
                    list.get(i).getItemDescription(),
                    list.get(i).getCreatedAt(),
                    list.get(i).getOwnerAddress(),
                    list.get(i).getIsFirst(),
                    list.get(i).getStatus()
                ));
        }
        return res;
    }
}
