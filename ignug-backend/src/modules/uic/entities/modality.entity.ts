import { CatalogueEntity, EnrollmentEntity, PlanningEntity } from '@uic/entities';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

@Entity('modalities', { schema: 'uic' })
export class ModalityEntity {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  // Relationships
  // @ManyToOne(() => CareerEntity, (career) => career.modalities)
  // @JoinColumn({ name: 'career_id' })
  // career: CareerEntity[];

  // @ManyToOne(() => CatalogueEntity, (state) => state.state)
  // @JoinColumn({ name: 'state_id' })
  // state: CatalogueEntity;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.planning)
  enrollments: EnrollmentEntity[];

  @OneToMany(() => PlanningEntity, (planning) => planning.nameModality)
  nameModality: PlanningEntity;

  //OneToMany projectPlan
  // Fields

  @Column('text', {
    name: 'description',
    comment: 'Es la descripcion de la modalidad',
  })
  description: string;
  
  @Column('varchar', {
    name: 'name',
    comment: 'Nombre de la modalidad (TIC/EC)',
  })
  name: string;
  planning: any;

  @Column('boolean', {
    name: 'state',
    comment: 'Es la descripcion de la modalidad',
  })
  state: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  setname() {
    if (!this.name) {
      return;
    }
  this.name= this.name.toUpperCase().trim()
  }
}