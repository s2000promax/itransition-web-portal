export type { LikeI, LikeSchemaI } from './model/types/like.interface';

export { getLikeDataSelector } from '@/entities/Like/model/selectors/getLikeData/getLikeData.selector';
export { getLikeIsLoadingSelector } from '@/entities/Like/model/selectors/getLikeIsLoading/getLikeIsLoading.selector';
export { getLikeErrorSelector } from '@/entities/Like/model/selectors/getLikeError/getLikeError.selector';

export { likeActions, likeReducer } from './model/slice/like.slice';

export { likeUserByReviewService } from './model/services/likeUserByReview.service';
